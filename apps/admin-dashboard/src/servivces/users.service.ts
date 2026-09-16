import { mockDashboardData } from "@/data/dashboard.mock";
import { mockUsersData } from "@/data/users.mock";
import type { GetUsersParams, UpdateUserInput, User, UserInput } from "@/types/user";
import { formatDate } from '@frontend/utils';

export function getUsers({ page, pageSize }: GetUsersParams) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = Math.ceil(mockUsersData.length / pageSize);
      const data = mockUsersData.slice(pageSize * (page - 1), pageSize * page);
      resolve({ total, data, page, pageSize });
    }, 1000);
  });
}

export function getUserById(id: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsersData.filter(item => item.id === id);
      resolve(user[0]);
    }, 1000);
  });
}

export function createUser(userInpt: UserInput) {
  const id = (mockUsersData.length + 1).toString();
  const createdAt = formatDate(Date.now())
  const newUser = { ...userInpt, id, createdAt };
  return new Promise((reslove) => {
    setTimeout(() => {
      mockUsersData.push(newUser);
      mockDashboardData.recentUsers.push(newUser);
      reslove(newUser);
    }, 1000);
  });
}

export function editUser(updateuserInpt: UpdateUserInput) {
  if (updateuserInpt.id === undefined) {
    return new Promise((reject) => {
      reject("id 为undefind");
    });
  }
  const createdAt = formatDate(Date.now())
  const updateUser = { ...updateuserInpt, createdAt };

  const updateFn = (usersArr: User[]) => {
    const index = usersArr.findIndex(user => user.id === updateUser.id);
    if (index !== -1) {
      usersArr[index] = updateUser;
    }
  }

  return new Promise((reslove) => {
    setTimeout(() => {
      updateFn(mockUsersData);
      updateFn(mockDashboardData.recentUsers);

      reslove(updateUser);
    }, 1000);
  });
}

export function deleteUser(id: string) {
  const deleteFn = (usersArr: User[]) => {
    const index = usersArr.findIndex(user => user.id === id);
    if (index !== -1) {
      usersArr.splice(index, 1);
    }
  }

  return new Promise((reslove) => {
    setTimeout(() => {
      deleteFn(mockUsersData);
      deleteFn(mockDashboardData.recentUsers);

      reslove(mockUsersData);
    }, 1000);
  });
}