import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRegister, setRegisterError, userRegister } from '../features/register-slice/registerSlice';
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

const schema = yup.object().shape({
  username: yup.string().min(2, 'Логин должен содержать минимум 2 символа').required('Укажите логин'),
  email: yup.string().min(4, 'Почта должна содержать минимум 4 символа').email().required('Укажите почту'),
  password: yup.string().min(8, 'Пароль должен содержать минимум 8 символов').max(32).matches(/(?=.*[!@#$%^&*()\-_=+{};:,<.>]{1})/, 'Пароль должен содержать хотя бы один спецсимвол').required('Это обязательное поле')
});

export const Register = () => {
  const dispatch = useDispatch();
  const err = useSelector((state) => state.register.err)
  const registerdata = useSelector((state) => state.register.registerdata)

  const ref = React.useRef();

  const {
    handleSubmit,
    register,
    // reset,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [inputs, setInputs] = useState({
    username:'',
    email:'',
    password:''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (registerdata === 'Пользователь создан успешно') {
      ref.current.reset();
      dispatch(setRegister(null))
      dispatch(setRegisterError(null))
      navigate('/login')
    }
  }, [registerdata])

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const onSubmit = async() => {
    dispatch(setRegisterError(null))
    dispatch(userRegister(inputs))
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      onSubmit();
    }
  }

  console.log('registerdata', registerdata)
  console.log('err', err)

  return (
    <div className='auth'>
      <h1>Регистрация</h1>
      <FormProvider>
      <form ref={ref} onKeyPress={handleKeyPress}>
        <div>
          <input {...register("username")} type="text" placeholder='имя пользователя' name='username' onChange={handleChange}/>
          {!errors.username && !err && <p></p>}
          {err && <p>{err}</p>}
          {errors.username && <p>{errors.username?.message}</p>}
        </div>
        <div>
          <input {...register("email")} type="email" placeholder='email' name='email' onChange={handleChange}/>
          {!errors.email && <p></p>}
          {errors.email && <p>{errors.email?.message}</p>}
        </div>
        <div>
          <input {...register("password")} type="text" placeholder='пароль' name='password' onChange={handleChange}/>
          {!errors.password && <p></p>}
          {errors.password && <p>{errors.password?.message}</p>}
        </div>
          <button onClick={handleSubmit(onSubmit)}>Зарегистрироваться</button>
        <span>Уже есть аккаунт?&nbsp;<Link to={'/login'}>Войти</Link></span>
      </form>
      </FormProvider>
    </div>
  )
}
