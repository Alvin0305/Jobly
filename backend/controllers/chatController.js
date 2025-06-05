export const createChat = async (req, res) => {
  const user1_id = req.user?.id;
  const { user2_id } = req.body;
};

export const getUserChats = async (req, res) => {};

export const getMessagesInChat = async (req, res) => {};

export const getPinnedMessage = async (req, res) => {};

export const fetchMediaInChat = async (req, res) => {};

export const clearChat = async (req, res) => {};

export const pinMessage = async (req, res) => {};

export const unpinMessage = async (req, res) => {};
