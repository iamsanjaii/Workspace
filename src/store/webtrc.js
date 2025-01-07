import Peer from 'peerjs';

export const peer = new Peer(undefined, {
  host: 'localhost',
  port: 9000,         
  path: '/peerjs',     
  secure: false,       
});
