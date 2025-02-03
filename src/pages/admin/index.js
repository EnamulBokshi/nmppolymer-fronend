import api from '../../api';
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    try{
        const response = await api.post('/api/user/login/', { email, password });
        if(response.status === 200){
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            history.push('/admin/dashboard');
        }else{
            alert('Invalid credentials');
        }
    }
    catch(error){
        console.log(error);
    }
    finally{
        setLoding(false);
    }        
    // history.push('/admin/dashboard');
};