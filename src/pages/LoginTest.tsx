import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/backgroundlogin.jpg';

const LoginTest = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Enviar a requisição para o login com email e senha na URL
      const response = await fetch(`http://127.0.0.1:8000/login?email=${email}&password=${password}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Verificar se a resposta do login foi bem-sucedida
      if (!response.ok) {
        throw new Error('Login falhou');
      }
  
      // 2. Captura do token e dados do usuário
      const data = await response.json();
      // Verificando se o token foi retornado
      if (!data.idToken) {
        throw new Error('Token não encontrado');
      }
  
      // Armazenando o token no localStorage
      localStorage.setItem('authToken', data.idToken);
      localStorage.setItem('email', data.email);
      const nomezinho = data.username;
      localStorage.setItem('userName', nomezinho)
  
      // 3. Fazer uma requisição para a rota /users com o token
      const usersResponse = await fetch(`http://127.0.0.1:8000/users?id_token=${data.idToken}`);
  
      // Verificando a resposta da rota de usuários
      if (!usersResponse.ok) {
        const errorData = await usersResponse.json();
        if (errorData.detail && errorData.detail === 'Access forbidden: Admins only.') {
          // O usuário não é admin
          setError('Acesso restrito: apenas administradores podem acessar a lista de usuários.');
          navigate('/user-projects');  // Redirecionar para a página do usuário
          return; // Não prossegue, pois não é admin
        }
        throw new Error('Erro ao acessar os usuários');
      }
  
      // 4. Captura da lista de usuários, se a resposta for bem-sucedida
      const usersData = await usersResponse.json();
  
      // Verifica se algum dos usuários é admin
      const adminUser = usersData.usuários.find((user: any) => user.email === email && user.is_admin);
      
      // Se for admin, redireciona para a página de administração
      if (adminUser) {
        navigate('/admin-projects');
      } else {
        navigate('/user-projects');
      }
  
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Email ou senha inválidos');
    }
  };
  

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-blue-500 text-white py-1 px-4 rounded shadow hover:bg-blue-700 transition duration-300 text-sm"
      >
        Voltar
      </button>

      <div
        className="p-14 rounded-lg shadow-lg w-96"
        style={{
          backgroundColor: 'rgba(187, 170, 170, 0.205)',
          backdropFilter: 'blur(15px)',
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Entrar</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4 relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full py-3 px-4 rounded-xl bg-white bg-opacity-10 text-white border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 hover:border hover:border-white/30"
              autoComplete="off"
            />
          </div>

          <div className="mb-6 relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full py-3 px-4 rounded-xl bg-white bg-opacity-10 text-white border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 hover:border hover:border-white/30"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Log in
          </button>

          {error && <p className="mt-2 text-center text-red-600">{error}</p>}

          <div className="mt-4 text-center">
            <p className="text-white">
              Não tem uma conta?{' '}
              <a href="/register" className="text-blue-300 underline">
                Registre-se
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginTest;
