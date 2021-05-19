import {useCallback, useEffect, useState} from "react";

const useAsync = (asyncFunction, immediate = true) => {
    const [status, setStatus] = useState('idle')
    const [value, setValue] = useState(null)
    const [error, setError] = useState(null)

    // функция "execute" оборачивает asyncFunction и
    // обрабатывает настройку состояний для pending, value и error
    // useCallback предотвращает вызов useEffect при каждом рендеринге
    // useEffect вызывается только при изменении asyncFunction
    const execute = useCallback(() => {
        setStatus('pending')
        setValue(null)
        setError(null)

        return asyncFunction()
            .then(response => {
                setValue(response)
                setStatus('success')
            })
            .catch(error => {
                setError(error)
                setStatus('error')
            })
    }, [asyncFunction])

    // вызываем execute для немедленного выполнения
    // с другой стороны, execute может быть вызвана позже
    // например, как обработчик нажатия кнопки
    useEffect(() => {
        if (immediate) {
            execute()
        }
    }, [execute, immediate])

    return { execute, status, value, error }
}