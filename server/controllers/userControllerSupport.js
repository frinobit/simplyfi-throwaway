import axios from "axios";

import { User } from "../models/userModel.js";
import { UserGuest } from "../models/userGuestModel.js";

import { Financial } from "../models/financialModel.js";
import { Personal } from "../models/personalModel.js";
import { Message } from "../models/messageModel.js";
import { Deepdive } from "../models/deepdiveModel.js";
import { ProgressBar } from "../models/progressBarModel.js";
import { Coverage } from "../models/coverageModel.js";

import { Asset } from "../models/financial/assetModel.js";
import { Liability } from "../models/financial/liabilityModel.js";
import { Income } from "../models/financial/incomeModel.js";
import { Expense } from "../models/financial/expenseModel.js";
import { Saving } from "../models/financial/savingModel.js";
import { Investment } from "../models/financial/investmentModel.js";
import { Insurance } from "../models/financial/insuranceModel.js";

import { File } from "../models/fileModel.js";

export const createUserAndInitializeDatabase = async (uid, email, token) => {
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
    const apiUrlCoverage = `${process.env.BACKEND_URL}/api/coverage`;
    axios.post(apiUrlCoverage, { requestData }, { headers });

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

export const createUserAndUpdateDatabase = async (old_uid, new_uid, email) => {
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
      { model: Deepdive, query: { user_id: old_uid } },
      { model: ProgressBar, query: { user_id: old_uid } },
      { model: Coverage, query: { user_id: old_uid } },
      { model: Asset, query: { user_id: old_uid } },
      { model: Liability, query: { user_id: old_uid } },
      { model: Income, query: { user_id: old_uid } },
      { model: Expense, query: { user_id: old_uid } },
      { model: Saving, query: { user_id: old_uid } },
      { model: Investment, query: { user_id: old_uid } },
      { model: Insurance, query: { user_id: old_uid } },
      { model: File, query: { user_id: old_uid } },
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
