import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '../../store/uiStore.js';

export const FlyingBadge = () => {
    const { animations, removeAnimation } = useUIStore();

    return (
        <AnimatePresence>
            {animations.map((anim) => (
                <motion.div
                    key={anim.id}
                    initial={{
                        left: anim.startX,
                        top: anim.startY,
                        opacity: 0.05,
                        scale: 0.7,
                        position: 'fixed',
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}
                    animate={{
                        left: [anim.startX, anim.midX, anim.endX],
                        top: [anim.startY, anim.midY, anim.endY],
                        opacity: [0.05, 0.95, 0.7, 0],
                        scale: [0.7, 1.15, 1, 0.6]
                    }}
                    transition={{
                        duration: 1.08,
                        ease: [0.25, 0.85, 0.25, 1],
                        times: [0, 0.28, 0.68, 1]
                    }}
                    onAnimationComplete={() => removeAnimation(anim.id)}
                    className="flying-badge"
                >
                    {anim.text}
                </motion.div>
            ))}
        </AnimatePresence>
    );
};
