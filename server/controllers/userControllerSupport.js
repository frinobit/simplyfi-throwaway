const User = require("../models/userModel");
const UserGuest = require("../models/userGuestModel");
const Financial = require("../models/financialModel");
const Personal = require("../models/personalModel");
const Message = require("../models/messageModel");
const ProgressBar = require("../models/progressBarModel");

const Asset = require("../models/financial/assetModel");
const Liability = require("../models/financial/liabilityModel");
const Income = require("../models/financial/incomeModel");
const Expense = require("../models/financial/expenseModel");
const Saving = require("../models/financial/savingModel");
const Investment = require("../models/financial/investmentModel");
const Insurance = require("../models/financial/insuranceModel");

const axios = require("axios");

const createUserAndInitializeDatabase = async (uid, email, token) => {
  try {
    // Create User in database
    if (email != "") {
      await User.create({
        user_id: uid,
        email: email,
      });
    } else {
      await UserGuest.create({ user_id: uid });
    }

    // Create default data in the database
    const requestData = { user_id: uid };
    const headers = { Authorization: `Bearer ${token}` };

    const apiUrlPersonals = `${process.env.BACKEND_URL}/api/personals`;
    axios.post(apiUrlPersonals, { requestData }, { headers });
    const apiUrlFinancials = `${process.env.BACKEND_URL}/api/financials`;
    axios.post(apiUrlFinancials, { requestData }, { headers });
    const apiUrlProgressBar = `${process.env.BACKEND_URL}/api/progressbar`;
    axios.post(apiUrlProgressBar, { requestData }, { headers });

    return true;
  } catch (error) {
    console.error("Error while initializing the database:", error);

    return false;
  }
};

const updateModel = async (Model, query, updateFields) => {
  try {
    await Model.updateMany(query, { $set: updateFields });
    return true;
  } catch (error) {
    console.error(`Error while updating ${Model.modelName} collection:`, error);
    return false;
  }
};

const createUserAndUpdateDatabase = async (old_uid, new_uid, email) => {
  try {
    // create User in database
    await User.create({
      user_id: new_uid,
      email: email,
    });

    const updateQueries = [
      { model: Financial, query: { user_id: old_uid } },
      { model: Personal, query: { user_id: old_uid } },
      { model: Message, query: { user_id: old_uid } },
      { model: ProgressBar, query: { user_id: old_uid } },
      { model: Asset, query: { user_id: old_uid } },
      { model: Liability, query: { user_id: old_uid } },
      { model: Income, query: { user_id: old_uid } },
      { model: Expense, query: { user_id: old_uid } },
      { model: Saving, query: { user_id: old_uid } },
      { model: Investment, query: { user_id: old_uid } },
      { model: Insurance, query: { user_id: old_uid } },
    ];

    for (const { model, query } of updateQueries) {
      await updateModel(model, query, { user_id: new_uid });
    }

    return true;
  } catch (error) {
    console.error("Error while updating the database:", error);

    return false;
  }
};

module.exports = {
  createUserAndInitializeDatabase,
  createUserAndUpdateDatabase,
};
