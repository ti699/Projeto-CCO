// Armazenamento compartilhado de usuários em memória
// Usado quando o banco de dados não está disponível

let usersMemory = [
  {
    id: 1,
    nome: 'Administrador',
    email: 'admin@sistemacco.com',
    senha: '$2a$10$EExPvC68u8D04Zt7b2q5cugf2ESr0IDl6OeCvuWthhYuiZ5LTz5Ty', // admin123
    cargo: 'Administrador',
    perfil: 'administrador',
    ativo: true
  },
  {
    id: 2,
    nome: 'Usuário Teste',
    email: 'teste@teste.com',
    senha: '$2a$10$EExPvC68u8D04Zt7b2q5cugf2ESr0IDl6OeCvuWthhYuiZ5LTz5Ty', // admin123
    cargo: 'Monitor',
    perfil: 'monitor',
    ativo: true
  },
  {
    id: 3,
    nome: 'João Silva',
    email: 'joao@sistemacco.com',
    senha: '$2a$10$EExPvC68u8D04Zt7b2q5cugf2ESr0IDl6OeCvuWthhYuiZ5LTz5Ty', // admin123
    cargo: 'Monitor Operacional',
    perfil: 'monitor',
    ativo: true
  },
  {
    id: 4,
    nome: 'Maria Santos',
    email: 'maria@sistemacco.com',
    senha: '$2a$10$EExPvC68u8D04Zt7b2q5cugf2ESr0IDl6OeCvuWthhYuiZ5LTz5Ty', // admin123
    cargo: 'Monitor Operacional',
    perfil: 'monitor',
    ativo: true
  },
  {
    id: 5,
    nome: 'Pedro Oliveira',
    email: 'pedro@sistemacco.com',
    senha: '$2a$10$EExPvC68u8D04Zt7b2q5cugf2ESr0IDl6OeCvuWthhYuiZ5LTz5Ty', // admin123
    cargo: 'Operador CCO',
    perfil: 'operador',
    ativo: true
  }
];

let nextUserId = 6;

module.exports = {
  getUsers: () => usersMemory,
  addUser: (user) => {
    const newUser = { ...user, id: nextUserId++, ativo: true };
    usersMemory.push(newUser);
    return newUser;
  },
  updateUser: (id, userData) => {
    const index = usersMemory.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
      usersMemory[index] = { ...usersMemory[index], ...userData };
      return usersMemory[index];
    }
    return null;
  },
  deleteUser: (id) => {
    const index = usersMemory.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
      usersMemory[index].ativo = false;
      return true;
    }
    return false;
  },
  findByEmail: (email) => {
    return usersMemory.find(u => u.email === email && u.ativo);
  }
};
