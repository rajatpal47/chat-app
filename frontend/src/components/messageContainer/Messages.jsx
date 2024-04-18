import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

function Messages() {

  const { messages, loading} = useGetMessages();
  useListenMessages();
  const lasMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lasMessageRef.current?.scrollIntoView({behavior: "smooth"});
    },50)
  },[messages])
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && 
        messages.length > 0 &&
        messages.map((messages) => (
           <div
           key={messages._id}
           ref={lasMessageRef}
           >
            <Message  message={messages}/>
           </div>
        ))
      }
        {loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}
        {!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>)}
    </div>
  )
}

export default Messages










// import React from 'react'
// import Message from './Message'

// function Messages() {
//   return (
//     <div className='px-4 flex-1 overflow-auto'>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//     </div>
//   )
// }

// export default Messages