
import { useHistory, useParams } from 'react-router-dom';

import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';


import logoImg from '../assets/images/logo.svg';
import deleteImage from '../assets/images/delete.svg'
import checkImage from '../assets/images/check.svg'
import answerImage from '../assets/images/answer.svg'

import '../styles/room.scss';


type RoomParams = {
    id: string;
}

export function AdminRoom() {

    // const { user } = useAuth();

    const history = useHistory();

    const params = useParams<RoomParams>();


    const roomId = params.id;

    const { questions, title } = useRoom(roomId);

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja deletar essa pergunta ?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        history.push('/');
    }



    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <div >
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>

                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala : {title}</h1>
                    {questions.length > 0 && (
                        <span>{questions.length} pergunta(s)</span>
                    )}

                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >

                                {!question.isAnswered && (
                                    <>
                                        <button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                            <img src={checkImage} alt="Marcar pergunta como respondida" />
                                        </button>

                                        <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                                            <img src={answerImage} alt="Dar destaque a pergunta" />
                                        </button>
                                    </>
                                )}

                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImage} alt="Remover pergunta" />
                                </button>


                            </Question>
                        )
                    })}
                </div>

            </main>
        </div >
    );
}