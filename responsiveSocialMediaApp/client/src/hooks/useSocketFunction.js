
import React from 'react';

import {io} from "socket.io-client";



const socket = io.connect(`http://localhost:2024`);


const useSocket = () => {

  return socket

}

export default useSocket





