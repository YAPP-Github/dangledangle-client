export const boxVariants = {
  initial: {
    opacity: 0,
    marginTop: '-50px'
  },
  visible: {
    opacity: 1,
    marginTop: 0
  },
  leaving: {
    opacity: 0,
    marginTop: '-50px'
  }
};

export const bottomVariants = {
  initial: {
    opacity: 0,
    y: '100%'
  },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 30
    }
  },
  leaving: {
    opacity: 0,
    y: '100%',
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 30
    }
  }
};

export const overlayVariants = {
  initial: {
    opacity: 0
  },
  visible: {
    opacity: 1
  },
  leaving: {
    opacity: 0
  }
};
