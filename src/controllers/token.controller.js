import Token from "../models/token.model";

export const generateToken = async (req, res) => {
  try {
    const { tokenValue } = req.body;
    const newToken = await Token.create({
      tokenValue: tokenValue ? tokenValue : 10,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTokens = async (req, res) => {
  try {
    const tokens = await Token.aggregate([
      {
        $match: {
          status: "active",
        },
      },
    ]);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getTokenByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const tokens = await Token.aggregate([
//       {
//         $match: {
//           tokenOwner: userId,
//         },
//       },
//     ]);

//     res.status(200).json(tokens);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateToken = async (req, res) => {};

export const redeemToken = async (req, res) => {};
