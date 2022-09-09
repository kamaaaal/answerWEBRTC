async function main () {
    // const localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    const localVideo = document.querySelector('#video1')
    const pc = new RTCPeerConnection({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]});
    pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(prompt('offer'))));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    console.log(JSON.stringify(answer));
    for (let  i =0; i < 3; i++){
        pc.addIceCandidate(JSON.parse(prompt('canidate')));
    }

        
    pc.addEventListener('connectionstatechange', event => {
        if (pc.connectionState === 'connected') {
            // Peers connected!
            console.log('peers connectec');
        }
    });

    const localStream = await navigator.mediaDevices.getUserMedia({vide: true, audio: true});
    // const peerConnection = new RTCPeerConnection(iceConfig);
    localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
    });

    const remoteVideo = document.querySelector('#video2');

    pc.addEventListener('track', async (event) => {
        const [remoteStream] = event.streams;
        remoteVideo.srcObject = remoteStream;
    });
}
main();