import {useState, useCallback, useEffect} from 'react'

const storageName = 'userDatjhjh'

export const useAuth = () => 
{
    const [token, setToken] = useState(null)
    const [refreshToken, setrRefreshToken] = useState(null)  
    const [id, setId] = useState(null)  
    const [language, setLanguage]= useState('en')
    
    const login = useCallback((jwtToken, refreshToken,id) => 
    {
        setToken(jwtToken)
        setrRefreshToken(refreshToken)
        setId(id)
        
        localStorage.setItem(storageName, JSON.stringify(
            {
                refreshToken: refreshToken, 
                token: jwtToken,
                id:id
            }))
     }, [])

    const logout = useCallback(() => 
    {
        setToken(null)
        setrRefreshToken(null)
        setId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => 
    {
        const data = JSON.parse(localStorage.getItem(storageName))
        setLanguage(document.cookie.split('=')[1])
        if (data && data.token)
        {
            login(data.token,data.refreshToken, data.id)
        }
    }, [login])

    return { login, logout, token, refreshToken, id ,language,setLanguage:(e)=>{document.cookie="language="+e; setLanguage(e)}}
}