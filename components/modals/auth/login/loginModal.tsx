'use client'

import { useModalContext } from "@/app/context/modal/modalContext";
import { useSession } from "next-auth/react";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { signIn } from "next-auth/react";

import { usePathname, useRouter } from "next/navigation";

export default function ModalLogin() {

    const isBreakpoint = useMediaQuery(768);
    const textSize = isBreakpoint ? 'text-xs' : 'text-sm';
    const { modalOpen, setModalOpen, setAlertMessage, setModalSubscribeOpen, setShowAlert } = useModalContext();
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();

    const handleOpenSub = () => {
        setModalOpen(false);
        setModalSubscribeOpen(true);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('handleSubmit function called');
        try {
            if (session?.user !== null && session?.user !== undefined) {
                alert('You are already logged in');
                return;
            }
            const res = await signIn('credentials', {
                email: event.currentTarget['modalLoginEmail'].value,
                password: event.currentTarget['modalLoginPassword'].value,
                redirect: false
            });
            
            console.log('res', res);
            
            if (res && res.error) {
                console.log('Error logging in:', res.error);
                setAlertMessage('Invalid email or password');
                setShowAlert(true);
                return;
            }
            
            setModalOpen(false);
            if (pathname === '/dashboard') {
                router.refresh();
            } else {
                router.replace("/dashboard");
            }
            
        } catch (error) {
            setAlertMessage('An error occurred. Please try again.');
            setShowAlert(true);
            console.log('Error logging in', error);
        }
    }

    return (
        <>
        <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={`${modalOpen ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm`}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className={`${isBreakpoint ? '' : 'text-lg'} font-semibold text-gray-900 dark:text-white`}>
                            Sign in
                        </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => setModalOpen(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                    </div>
                    <form id="loginForm" className="p-4 md:p-5" onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-6 grid-cols-2">
                            <label htmlFor="modalLoginEmail" className={`block my-2 ${textSize} font-medium text-gray-900 dark:text-white`}>Email</label>
                            <input type="email" name="modalLoginEmail" id="modalLoginEmail" autoComplete='email' className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${textSize}`} placeholder="Email" required/>

                            <label htmlFor="modalLoginPassword" className={`block my-2 ${textSize} font-medium text-gray-900 dark:text-white`}>Password</label>
                            <input type="password" name="modalLoginPassword" id="modalLoginPassword" autoComplete='current-password' className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${textSize}`} placeholder="Password" required/>
                        </div>
                        <button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg ${textSize} px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                            Sign In
                        </button>
                        <div className="flex flex-row justify-around my-4 p-2 text-sm space-x-1">
                            {/**<p className="text-black">
                                Don&apos;t have an account yet? 
                            </p>
                            <div className="text-sky-700 cursor-pointer" onClick={swapAuthDesire}>
                                Create an account here
                            </div>*/}
                            <p className="text-black">
                                Looking for a way to Follow? 
                            </p>
                            <div className="text-sky-700 cursor-pointer" onClick={handleOpenSub}>
                                Subscribe here
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
        </>
    )
}