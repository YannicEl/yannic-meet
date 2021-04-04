<template>
  <div class="mt-10 grid gap-6 grid-cols-2">
    <video class="bg-gray-200 w-full" ref="localVideo" autoplay playsinline muted></video>
    <video class="bg-gray-200 w-full" ref="remoteVideo" autoplay playsinline></video>

    <div class="grid gap-6 grid-cols-2">
      <button class="bg-gray-300 px-4 py-2 hover:bg-gray-400" @click="startWebcam">Start Webcam</button>

      <button class="bg-gray-300 px-4 py-2 hover:bg-gray-400" @click="startCall">Start Call</button>

      <input v-model="callId" type="text" />
      <button class="bg-gray-300 px-4 py-2 hover:bg-gray-400" @click="answerCall">Answer Call</button>

      <button class="bg-gray-300 px-4 py-2 hover:bg-gray-400" @click="info">Info</button>
    </div>
  </div>
</template>

<script lang="ts" setup >
import { onMounted, ref } from 'vue'
import { COLLECTIONS } from '../config';
import { db } from '../firebase';

const servers: RTCConfiguration = {
  iceServers: [{
    urls: ["stun:eu-turn6.xirsys.com"]
  }, {
    username: "ZtrcM1pMrjQFEjOqgsL5aEWz-2LlIfYUi89mLi7TVMigDVY1Sz1mkqiXbk3aS8IMAAAAAGBoZOBiYW1pbw==",
    credential: "58631c8a-947b-11eb-9aef-0242ac140004",
    urls: [
      "turn:eu-turn6.xirsys.com:80?transport=udp",
      "turn:eu-turn6.xirsys.com:3478?transport=udp",
      "turn:eu-turn6.xirsys.com:80?transport=tcp",
      "turn:eu-turn6.xirsys.com:3478?transport=tcp",
      "turns:eu-turn6.xirsys.com:443?transport=tcp",
      "turns:eu-turn6.xirsys.com:5349?transport=tcp"
    ]
  }],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers)
const localVideo = ref<HTMLVideoElement | null>(null);
let localStream: MediaStream;

const remoteVideo = ref<HTMLVideoElement | null>(null);
let remoteStream: MediaStream;

let callId = ref("");

onMounted(() => {
  pc.oniceconnectionstatechange = (event) => {
    console.log("ice connection change")
    console.log(event)
  }

  pc.onicecandidateerror = (event) => {
    console.log("ice error")
    console.log(event)
  }

  pc.onconnectionstatechange = (event) => {
    console.log("connection change")
    console.log(event)
  }

  pc.onnegotiationneeded = (event) => {
    console.log("negotiation needed")
    console.log(event)
  }
})

const startWebcam = async () => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    remoteStream = new MediaStream();

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    })

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = event => {
      console.log(event)
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track)
      })
    }

    if (localVideo.value) {
      console.log("added local media stream")
      localVideo.value.srcObject = localStream
    }

    if (remoteVideo.value) {
      console.log("added remote media stream")
      remoteVideo.value.srcObject = remoteStream
    }
  } catch (err) {
    console.log(err)
  }
}

const startCall = async () => {
  const callDoc = db.collection(COLLECTIONS.calls).doc()
  const offerCandidates = callDoc.collection(COLLECTIONS.offerCandidates);
  const answerCandidates = callDoc.collection(COLLECTIONS.answerCandidates);

  callId.value = callDoc.id;

  // Get candidates for caller, save to db
  pc.onicecandidate = event => {
    event.candidate && offerCandidates.add(event.candidate.toJSON());
  }

  // Create offer
  const offerDesc = await pc.createOffer();
  await pc.setLocalDescription(offerDesc);

  const offer = {
    sdp: offerDesc.sdp,
    type: offerDesc.type,
  }

  await callDoc.set({ offer })

  // Listen for remote answer
  callDoc.onSnapshot((snapshot) => {
    console.log("remote answer")
    const data = snapshot.data();

    if (!pc.currentRemoteDescription && data?.answer) {
      const answerDesc = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDesc);
    }
  })

  // When answered, add candidate to perr connection
  answerCandidates.onSnapshot((snapshot) => {
    console.log('answer snapshot')
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        return pc.addIceCandidate(candidate);
      }
    })
  })
}

const answerCall = async () => {
  const callDoc = db.collection(COLLECTIONS.calls).doc(callId.value)
  const offerCandidates = callDoc.collection(COLLECTIONS.offerCandidates);
  const answerCandidates = callDoc.collection(COLLECTIONS.answerCandidates);

  pc.onicecandidate = event => {
    event.candidate && answerCandidates.add(event.candidate.toJSON())
  }

  const callData = (await callDoc.get()).data();

  if (callData) {
    const offerDesc = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDesc))

    const answerDesc = await pc.createAnswer();
    await pc.setLocalDescription(answerDesc);

    const answer = {
      sdp: answerDesc.sdp,
      type: answerDesc.type,
    };

    await callDoc.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
      console.log('offer snapshot')
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate)
        }
      });
    });
  } else {
    console.log("No Call Data")
  }
}

const info = () => {
  console.log(pc)
}
</script>
