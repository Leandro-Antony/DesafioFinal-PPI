import styles from "./Login.module.css";
import Header from "../../components/Header.jsx";
import { Link, useNavigate } from "react-router";
import { Mail, LockKeyhole } from "lucide-react";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Impede o scroll

    return () => {
      document.body.style.overflow = 'auto'; // Restaura o scroll
    };
  }, []);

  const navigate = useNavigate();

  return (
    <>
        <div className={styles.bg}></div>

        <div className={styles.container}>
          <Header />

          <div className={styles.inner}>
            <div className={styles.login}>
              <h1 className={styles.greeting}>Seja bem-vindo de volta</h1>
              <div className={styles.input_}>
                <Mail /> <input type="text" placeholder="Email" className={styles.input} />
              </div>
              <div className={styles.input_}>
                <LockKeyhole /> <input type="password" placeholder="Senha" className={styles.input} />
              </div>
              <button className={styles.btn} onClick={() => navigate("/")}>Login</button>
              <p className={styles.createAcc}>Não tem uma conta? <Link to={"/sign-in"}>Crie uma!</Link></p>
            </div>
          </div>
        </div>
    </>
  );
}
