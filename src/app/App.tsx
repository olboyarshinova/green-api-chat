import {useState} from 'react';
import type {Credentials} from '@/features/credentials/model/types';
import {ChatPage} from '@/pages/ChatPage/ChatPage';
import {LoginPage} from '@/pages/LoginPage/LoginPage';

function App() {
    const [credentials, setCredentials] = useState<Credentials | null>(null);

    if (!credentials) {
        return <LoginPage onConnect={setCredentials}/>;
    }

    return <ChatPage credentials={credentials}/>;
}

export default App;
