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
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        position: 'fixed',
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}
                    animate={{
                        left: [anim.startX, anim.midX, anim.endX],
                        top: [anim.startY, anim.midY, anim.endY],
                        opacity: [1, 1, 0.8, 0],
                        scale: [1, 0.6, 0.4],
                        rotate: [0, 15, 20]
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1], // easeOutBack for satisfying bounce
                        times: [0, 0.5, 1],
                        opacity: { times: [0, 0.6, 0.85, 1] }
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
