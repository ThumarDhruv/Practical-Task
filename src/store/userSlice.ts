import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types";
import { getUsers, updateUser as updateUserAPI } from "../api/userApi";

// ✅ Async thunk to fetch users
export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const response = await getUsers();
    return response;
  }
);

// ✅ Async thunk to update a user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, user }: { id: number; user: User }) => {
    const response = await updateUserAPI(id, user);
    return response;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [] as User[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      })
      // ✅ Handle updateUser API
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
