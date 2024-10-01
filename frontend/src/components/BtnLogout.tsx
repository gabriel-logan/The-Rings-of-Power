import * as motion from "framer-motion/client";

import { handleLogoutServer } from "@/actions";

interface BtnLogoutProps {
  className?: string;
  children?: React.ReactNode;
}

export default function BtnLogout({ className, children }: BtnLogoutProps) {
  return (
    <motion.form>
      <motion.button
        formAction={handleLogoutServer}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={className}
      >
        {children ? children : "Logout"}
      </motion.button>
    </motion.form>
  );
}
