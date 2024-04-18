// @ts-nocheck
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, setUserError } from '../features/auth-slice/authSlice'
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

const schema = yup.object().shape({
  username: yup.string().min(2, 'Логин должен содержать минимум 2 символа').required('Укажите логин'),
  password: yup.string().max(32).required('Это обязательное поле')
});

export const Login = () => {
  const dispatch = useDispatch();
  const err = useSelector((state) => state.user.err)
  const currentUser = useSelector((state) => state.user.currentUser)

  const ref = React.useRef();

  const {
    handleSubmit,
    register,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [inputs, setInputs] = useState({
    username:'',
    password:''
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser !== null) {
      ref.current.reset();
      dispatch(setUserError(null))
      navigate('/')
    }
  }, [currentUser])

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const onSubmit = async() => {
    dispatch(setUserError(null))
    dispatch(userLogin(inputs))
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      onSubmit();
    }
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <FormProvider>
      <form ref={ref} onKeyPress={handleKeyPress}>
      <div>
          <input {...register("username")} type="text" placeholder='имя пользователя' name='username' onChange={handleChange}/>
          {!errors.username && !err && <p></p>}
          {err && <p>{err}</p>}
          {errors.username && <p>{errors.username?.message}</p>}
        </div>
        <div>
          <input {...register("password")} type="text" placeholder='пароль' name='password' onChange={handleChange}/>
          {!errors.password && <p></p>}
          {errors.password && <p>{errors.password?.message}</p>}
        </div>
        <button onClick={handleSubmit(onSubmit)}>Войти</button>
      <span>У вас нет аккаунта?&nbsp;<Link to={'/register'}>Зарегистрироваться</Link></span>
      </form>
      </FormProvider>
    </div>
  )
}
