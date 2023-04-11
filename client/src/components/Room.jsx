import React from 'react';

const Room = ({username, room, setUsername, setRoom, setChatScreen, socket}) => {

    const sendRoom = () => {
        socket.emit('room', room)
        setChatScreen(true)
    }

        return (
            <div className='flex items-center justify-center h-full'>
                <div className='w-2/3 h-[350px] bg-[#282828] flex flex-col space-y-4 p-3 rounded-xl p-5 justify-center'>
                    <h1 className='text-center text-white p-3 font-bold tracking-widest text-xl'>HOŞ GELDİNİZ</h1>
                    <input onChange={e => setUsername(e.target.value)} value={username} className='p-3 rounded-xl outline-none m-14 bg-black text-white' type="text" placeholder='kullanıcı adı' />
                    <input onChange={e => setRoom(e.target.value)} value={room} className='p-3 rounded-xl outline-none m-14 bg-black text-white' type="text" placeholder='Oda No' />
                    <div onClick={sendRoom} className='bg-sky-500/75 hover:bg-sky-500/100 ease-in duration-200 text-white cursor-pointer h-12 pt-2 text-xl text-center rounded-xl m-14'>Bağlan</div>
                </div>
            </div>
        );
}

export default Room;