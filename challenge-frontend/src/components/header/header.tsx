"use client";
import {useRouter, usePathname} from 'next/navigation'
import styles from './header.module.scss'
import MenuIcon from '@mui/icons-material/Menu'
import React, {MouseEvent, useEffect, useState} from 'react'
import {Divider, Menu} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import {toast} from 'react-toastify'
const Header = () => {
	const router = useRouter()
	const pathName = usePathname()
	const [user, setUser] = useState<null | string>(null)
	const [menuOpen, setMenuOpen] = useState(false)
	const [anchorEl, setAnchorEl] = useState<any>(null)
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget)
	}
	
	useEffect(() => {
		if (window) {
			if ((sessionStorage.getItem('user')) !== '') {
				setUser(JSON.parse(sessionStorage.getItem('user') as string))
			}
		}
	}, [pathName])
	
	return (
		<div className={styles.containerHeader}>
			<div className={styles.itemsHeader}>
				<div className={styles.logoContainer} onClick={() => router.push('/')}>
					<img src={'logo.svg'} alt={'logo'} width={100} height={100}/>
				</div>
				
				<div className={styles.textContainerHeader}>
					{!user ?
						<div>
							<h2 className={styles.loginText}
							    onClick={() => {
								    router.push('/login')
							    }}
							>
								Login</h2>
						</div>
						:
						<div
							className={styles.buttonHeaderMenu}
							onClick={(e) => {
								setMenuOpen(!menuOpen)
								handleClick(e)
							}}>
							<MenuIcon/>
							{menuOpen &&
                              <div className={styles.dropdownContent}>
								  {user &&
                                    <div className={styles.menuListItem}
                                         onClick={() => {
										     sessionStorage.removeItem('user');
										     router.push('/login')
										     toast(`Até mais! 👋`, {
											     icon: false,
											     position: 'top-center',
											     autoClose: 2000,
											     hideProgressBar: false,
											     closeOnClick: true,
											     pauseOnHover: true,
											     draggable: true,
											     progress: undefined,
											     progressClassName: 'progress',
										     })
									     }
									     }>
                                      <LogoutIcon/>
                                      <div className={styles.textHeader}>
                                        Sair
                                      </div>
                                    </div>
									  
								  }
                              </div>
							}
						</div>
					}
				</div>
			</div>
			<Divider flexItem className={styles.divider}/>
		</div>
	)
}

export default Header
