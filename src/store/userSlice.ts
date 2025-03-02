import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUsers, addUser, updateUser, deleteUser } from "../api/userApi";
import { User } from "../types";

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    return await getUsers();
  }
);

export const createUser = createAsyncThunk<User, User>(
  "users/addUser",
  async (user) => {
    return await addUser(user);
  }
);

export const modifyUser = createAsyncThunk<User, { id: string; user: User }>(
  "users/updateUser",
  async ({ id, user }) => {
    return await updateUser(id, user);
  }
);

export const removeUser = createAsyncThunk<string, string>(
  "users/deleteUser",
  async (id) => {
    await deleteUser(id);
    return id;
  }
);

// 🛠 User Slice
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [] as User[],
    loading: false,
    error: null as string | null,
    searchQuery: "",
    roleFilter: "",
  },
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setRoleFilter: (state, action: PayloadAction<string>) => {
      state.roleFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch users";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(modifyUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setSearchQuery, setRoleFilter } = userSlice.actions;
export default userSlice.reducer;
