import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from './data/data_manager'
import HomePage from './pages/home'
import MessagesPage from './pages/messages'
import AdminPage from './pages/admin'
import DashBoard from './pages/dashboard'

const app = document.getElementById('app')


const routes = {
	'home': HomePage(),
	'messages': MessagesPage(),
	'admin': AdminPage(),
	'dashboard': DashBoard()
}

navigate()

export function navigate (route){
	const destination = routes[route]?route:'home'
	const buttons = document.querySelectorAll(`a[data-route]`)
 
 buttons.forEach((navbtn)=>{
  const data = navbtn.getAttribute('data-route')
  
  if (data==destination){
   navbtn.classList.add('active')
  } else {
   navbtn.classList.remove('active')
  }
 })
	ReactDOM.render(routes[destination],app)
}


const buttons = document.querySelectorAll('a[data-route]')
buttons.forEach((btn)=>{
	const data = btn.getAttribute('data-route')
	btn.onclick=(event)=>{
		navigate(data)
	}
})
