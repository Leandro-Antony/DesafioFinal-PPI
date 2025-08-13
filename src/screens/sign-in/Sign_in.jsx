import { useEffect } from 'react';
import styles from './Sign_in.module.css';
import Header from "../../components/Header.jsx"
import { Mail, LockKeyhole, User, CalendarDays, Phone, Hash } from "lucide-react";

export default function Sign_in() {

    useEffect(() => {
        document.body.style.overflow = 'scroll';
    }, []);

    return (
        <>
            <div className={styles.bg}></div>

            <div className={styles.container}>
                <Header />

                <div className={styles.inner}>
                    <div className={styles.sign_in}>
                        <h1 className={styles.greeting}>Cadastrar-se</h1>

                        <div className={styles.input_}>
                            <User /> <input type="text" placeholder="Nome" className={styles.input} />
                            <input type="text" placeholder="Sobrenome" className={styles.input} />
                        </div>
                        <div className={styles.date}>
                            <label htmlFor="DataNascimento" className={styles.dateTitle}>Data de nascimento</label>
                            <div className={styles.input_}>
                                <CalendarDays /><input type="date" className={styles.input} />
                            </div>
                        </div>
                        
                        <div className={styles.input__}>
                            <div className={styles.input_}>
                            <Phone /> <input type="tel" placeholder="Celular" className={styles.input} />
                            </div>
                            <div className={styles.input_}>
                            <Hash /><input type="text" placeholder="CPF" className={styles.input} />
                            </div>
                        </div>

                        <div className={styles.input_}>
                            <Mail /> <input type="text" placeholder="Email" className={styles.input} />
                        </div>
                        <div className={styles.input_}>
                            <LockKeyhole /> <input type="text" placeholder="Senha" className={styles.input} />
                        </div>
                        <button className={styles.btn}>Login</button>
                        <p className={styles.createAcc}>Não tem uma conta? <a href="">Crie uma!</a></p>
                    </div>
                </div>
            </div>


        </>
    );
}