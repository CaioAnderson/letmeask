import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';

import Illustration from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg';
import GoogleIcon from '../assets/images/google-icon.svg';

import '../styles/auth.scss';


export function Home() {


    const history = useHistory();

    const { user, signInWithGoogle } = useAuth();


    async function handleCreateRoom() {
        if(!user){
           await signInWithGoogle();
        }
            history.push('/rooms/new');
    }


    return (
        <div id="page-auth">
            <aside>
                <img src={Illustration} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={LogoImg} alt="LetMeAsk" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={GoogleIcon} alt="Logo do Google" />
                        Crie sua sala com google
                    </button>

                    <div className="separator">ou entre em uma sala</div>

                    <form action="">
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>

                </div>
            </main>
        </div>
    )
}