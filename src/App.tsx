import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { genericPage } from "./interfaces/IPage";
import LoginPage from "./pages/LoginPage";
import EditPage from "./pages/EditPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./views/MainLayout";
import { ITech } from "./interfaces/ITech";
import { TechCategories } from "./enums/TechCategories";
import EditableList from "./components/EditableList";
import { EditableListTypes } from "./enums/EditableListTypes";
import { IProject } from "./interfaces/IProject";
import { IFunFact } from "./interfaces/IFunFact";
import { IContactInfo } from "./interfaces/IContactInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFunFacts, selectFunFactsData } from "./store/funfactSlice";
import { AppDispatch } from "./store/store";
import { checkAuthentication, selectTokenStatus } from "./store/authenticationSlice";
import { Status } from "./store/enums/status";
import { fetchAllContactInfos, selectContactInfoData } from "./store/contactInfoSlice";
import { fetchAllTechs, selectTechData } from "./store/techSlice";
import { fetchAllProjects, selectProjectData } from "./store/projectSlice";

const LoginPageX = genericPage(LoginPage)
const EditPageX = genericPage(EditPage)
const NotFoundPageX = genericPage(NotFoundPage)

const fillerTechs: ITech[] = [
	{
		new: true,
		techName: '',
		category: TechCategories.LANGUAGE,
		skillRating: 0,
		usedInProjects: []
	},
	{
		new: false,
		id: 1,
		techName: 'newTech 1',
		category: TechCategories.FRAMEWORK,
		skillRating: 1.0,
		usedInProjects: [1, 2, 3]
	},
	{
		new: false,
		id: 2,
		techName: 'newTech 2',
		category: TechCategories.FRAMEWORK,
		skillRating: 2.0,
		usedInProjects: [1, 2, 3]
	},
	{
		new: false,
		id: 3,
		techName: 'newTech 3',
		category: TechCategories.FRAMEWORK,
		skillRating: 1.0,
		usedInProjects: [1, 2, 3]
	},
	{
		new: false,
		id: 4,
		techName: 'newTech 4',
		category: TechCategories.FRAMEWORK,
		skillRating: 2.0,
		usedInProjects: [1, 2, 3]
	},
	{
		new: false,
		id: 5,
		techName: 'newTech 5',
		category: TechCategories.FRAMEWORK,
		skillRating: 1.0,
		usedInProjects: [1, 2, 3]
	},
	{
		new: false,
		id: 6,
		techName: 'newTech 6',
		category: TechCategories.FRAMEWORK,
		skillRating: 2.0,
		usedInProjects: [1, 2, 3]
	}
]

const fillerProjects: IProject[] = [
	{
		new: true,
		projectName: '',
		description: '',
		client: '',
		link: '',
		usedTechIds: []
	},
	{
		new: false,
		id: 1,
		projectName: 'newProject 1',
		description: 'description filler',
		client: 'switch-a-dish',
		link: 'https://kp.nl',
		usedTechIds: [2]
	},
	{
		new: false,
		id: 2,
		projectName: 'newProject 2',
		description: 'description filler',
		client: 'switch-a-dish',
		link: '',
		usedTechIds: [1, 2, 3]
	},
]

const fillerFunFacts: IFunFact[] = [
	{
		funfact: '',
		new: true
	},
	{
		id: 1,
		funfact: 'Test funfact 1',
		new: false
	},
	{
		id: 2,
		funfact: 'Test funfact 2',
		new: false
	},
]

const fillerContacts: IContactInfo[] = [
	{
		id: 1,
		personalEmail: 'j.nowomiejski1998@gmail.com',
		companyEmail: 'info@crunch-time.nl',
		phoneNumber: '0645576445',
		new: false
	}
]

const App = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const tokenStatus = useSelector(selectTokenStatus)
	const techData = useSelector(selectTechData)
	const projectData = useSelector(selectProjectData)
	const funFactsData = useSelector(selectFunFactsData)
	const contactInfoData = useSelector(selectContactInfoData)

	const fetchFunfacts = async () => {
		await dispatch(fetchAllFunFacts())
	}

	const fetchContactInfos = async () => {
		await dispatch(fetchAllContactInfos())
	}

	const fetchTechs = async () => {
		await dispatch(fetchAllTechs())
	}

	const fetchProjects = async () => {
		await dispatch(fetchAllProjects())
	}

	useEffect(() => {
		const checkAuth = async () => {
			await dispatch(checkAuthentication())
			console.log('heyo')
		}
		try {
			checkAuth()
		} catch (error) {
			console.log('first useEffect error')
		}
	}, [])

	useEffect(() => {
		const fetchAllData = async () => {
			await fetchFunfacts()
			await fetchContactInfos()
			await fetchTechs()
			await fetchProjects()
		}
		if (tokenStatus.status === Status.SUCCEEDED) {
			fetchAllData()
		} else if (tokenStatus.status === Status.FAILED) {
			navigate('/login')
			console.log('token rejected error')
		}
	}, [tokenStatus])


	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<LoginPageX pageTitleProp="login" pageUrlProp="/login"/>} />
				<Route path='login' element={<LoginPageX pageTitleProp="login" pageUrlProp="/login"/>} />
				<Route path='edit' element={<EditPageX pageTitleProp="edit" pageUrlProp="/edit"/>}>
					<Route path="techs" element={<EditableList type={EditableListTypes.TECH} items={[techData.newTech, ...techData.techs]} relientOn={[[]]}/>}/>
					<Route path="projects" element={<EditableList type={EditableListTypes.PROJECT} items={[projectData.newProject, ...projectData.projects]} relientOn={[techData.techs]}/>} />
					<Route path="funfacts" element={<EditableList type={EditableListTypes.FUNFACT} items={[funFactsData.newFunfact, ...funFactsData.funfacts]} relientOn={[[]]}/>} />
					<Route path="contact" element={<EditableList type={EditableListTypes.CONTACT} items={contactInfoData.contactInfos} relientOn={[[]]}/>} />
				</Route>
				<Route path='not-found' element={<NotFoundPageX pageTitleProp="not found" pageUrlProp="/not-found" />} />
				<Route path='*' element={<Navigate to="not-found" replace/>} />
			</Route>
		</Routes>
	);
};

export default App;
