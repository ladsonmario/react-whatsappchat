import './styles.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import * as T from '../../types/types';
import { useAPI } from '../../firebase/api';

type Props = {
    onReceive: (user: T.UserLoginType) => void;
}

export const Login = ({ onReceive }: Props) => {    
    const handleFacebookLogin = async () => {
        const result = await useAPI.fbPopup() as T.ResultLoginType;        
        
        if(result.user) {
            onReceive(result.user);
        } else {
            alert('Ocorreu algum erro com seu Login!');
        }
    }

    return (
        <div className="login">
            <button onClick={handleFacebookLogin}>
                Fazer Login com o Facebook
                <FacebookIcon />
            </button>
        </div>
    );
}