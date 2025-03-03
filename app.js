import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from './data/data_manager'
import HomePage from './pages/home.jsx'
import MessagesPage from './pages/messages.jsx'
import AdminPage from './pages/admin.jsx'
import DashBoard from './pages/dashboard.jsx'

const app = document.getElementById('app')
const preloader = document.getElementById('loader')
const notifElement = document.getElementById('Modal')
const notifModal = new bootstrap.Modal(notifElement, {
	keyboard: true,
	backdrop: true
})


const routes = {
	'home': HomePage(),
	'messages': MessagesPage(),
	'admin': AdminPage(),
	'dashboard': DashBoard()
}

navigate()

export function showNotif (title,body,key=true,type=true){

  
const titleText = notifElement.querySelector('.modal-title')
const bodyText = notifElement.querySelector('.modal-body')
notifModal._config.key = key;
notifModal._config.backdrop = type
titleText.innerHTML= title  
bodyText.innerHTML = body  
notifModal.show() 
  
return notifModal
}

export function navigate (route){
	const destination = routes[route]?route:'home'
	const buttons = document.querySelectorAll(`a[data-route]`)
	const navbar = document.getElementById('collapsibleNavbar')
 preloader.hidden=false
 navbar.classList.remove('show')
 navbar.classList.add('hide')
 
 buttons.forEach((navbtn)=>{
  const data = navbtn.getAttribute('data-route')
  
  if (data==destination){
   navbtn.classList.add('active')
  } else {
   navbtn.classList.remove('active')
  }
 })
	ReactDOM.render(routes[destination],app)
	setTimeout(function (){
		preloader.hidden=true
	},1000)
}

const buttons = document.querySelectorAll('a[data-route]')
buttons.forEach((btn)=>{
	const data = btn.getAttribute('data-route')
	btn.onclick=(event)=>{
		navigate(data)
	}
})