import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import PageTitle from "../components/PageTitle";
import { IPageProps } from "../interfaces/IPage";
import { setUsername, setPassword, sendAuthentication, selectRequestStatus, selectTokenStatus, checkAuthentication } from "../store/authenticationSlice";
import { Status } from "../store/enums/status";
import { AppDispatch } from "../store/store";


const LoginPage = (props: IPageProps) => {
	const navigate = useNavigate()
	let requestStatus = useSelector(selectRequestStatus)
	let tokenStatus = useSelector(selectTokenStatus)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (tokenStatus.status === Status.SUCCEEDED) {
			navigate('/edit/techs')
		} else if (tokenStatus.status === Status.FAILED) {
			console.log('mmmm', tokenStatus.error)
		}
	}, [tokenStatus.status])

	const loginEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if(e.key === 'Enter') login()
	}

	const login = async () =>  {
		await dispatch(sendAuthentication())
		await dispatch(checkAuthentication())
	}

	const logUsername = (input: string) => {
		dispatch(setUsername(input))
	}

	const logPassword = (input: string) => {
		dispatch(setPassword(input))
	}

	return (
		<div onKeyDown={loginEnter} >
			<PageTitle pageTitleProp={props.pageTitleProp}/>
			{requestStatus.status === Status.FAILED && <div>{requestStatus.error}</div>}
			<InputField onChange={(field, input) => logUsername(input)} name="username" label="username" margin="my-4" placeholder="kobe"/>
			<InputField onChange={(field, input) => logPassword(input)} name="password" label="password" margin="my-4" placeholder="password" password/>
			<Button onClick={() => login()} color='text-primary' hoverColor='hover:text-primary'>login</Button>
		</div>
	);
};

export default LoginPage;
