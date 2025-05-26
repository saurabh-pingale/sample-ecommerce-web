export class AuthService {
    static USERS_KEY = 'ecommerce_users';

    static async registerUser(userData) {
        return new Promise((resolve, reject) => {
            try {
                let users = JSON.parse(localStorage.getItem(this.USERS_KEY)) || [];
                
                const userExists = users.some(user => user.email === userData.email);
                if (userExists) {
                    throw new Error('User already exists');
                }

                users.push(userData);
                localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
                resolve(userData);
            } catch (error) {
                reject(error);
            }
        });
    }

    static async loginUser(email, password) {
        return new Promise((resolve, reject) => {
            try {
                const users = JSON.parse(localStorage.getItem(this.USERS_KEY)) || [];
                const user = users.find(u => u.email === email && u.password === password);
                
                if (!user) {
                    throw new Error('Invalid credentials');
                }
                
                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }
}