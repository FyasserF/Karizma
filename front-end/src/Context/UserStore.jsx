import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState({
        'token': '',
        'id': '',
        'name': '',
        'image': null,
        'role': null
    });

    useEffect(() => {
        function isUserEmpty() {
            const user = JSON.parse(localStorage.getItem('user'));
            return !user || Object.keys(user).length === 0;
        }

        const isEmptyUser = isUserEmpty();

        if (!isEmptyUser) {
            const user = JSON.parse(localStorage.getItem('user'));
            setUserLogin({
                'token': user.token || '',
                'id': user.id || '',
                'name': user.name || '',
                'image': user.image || null,
                'role': user.role || null
            });
        } else {
            ''
        }
    }, []);

    const handleChange = (token, id, name, image, s) => {
        localStorage.setItem('user', JSON.stringify({ 'token': token, 'id': id, 'name': name, 'image': image, 'role': s }))
        setUserLogin({
            'token': token || '',
            'id': id || '',
            'name': name || '',
            'image': image || null,
            'role': s || null
        });

    };



    return (
        <UserContext.Provider value={[userLogin, handleChange]}>
            {children}
        </UserContext.Provider>
    );
};
