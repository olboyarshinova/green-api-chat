import type {Credentials} from '@/features/credentials/model/types';
import {LoginPage} from '@/pages/LoginPage/LoginPage';

function App() {
    const handleConnect = (credentials: Credentials) => {
        console.log(credentials);
    };

    return <LoginPage onConnect={handleConnect}/>;
}

export default App;
