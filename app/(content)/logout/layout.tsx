'use client'

import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { motion } from "framer-motion";

export default function LogoutLayout({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
        key="logoutLayoutKey"
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.2,
        }}>
            <MainPageBody>
                {children}
            </MainPageBody>
        </motion.div>
    );
}