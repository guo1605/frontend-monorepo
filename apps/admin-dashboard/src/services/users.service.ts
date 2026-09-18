import { mockDashboardData } from "@/data/dashboard.mock";
import { mockUsersData } from "@/data/users.mock";
import type { GetUsersParams, UpdateUserInput, User, UserInput, UsersResponse } from "@/types/user";
import { formatDate } from '@frontend/utils';

let testId = 0;

export function getUsers({ page, pageSize }: GetUsersParams): Promise<UsersResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pageTotal = Math.ceil(mockUsersData.length / pageSize);
      const data = mockUsersData.slice(pageSize * (page - 1), pageSize * page);
      resolve({ pageTotal, data });
    }, 1000);
  });
}

export function getUserById(id: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsersData.find(item => item.id === id);
      if (user === undefined) {
        reject('未查询到该用户')
      } else {
        resolve(user);
      }
    }, 1000);
  });
}

export function createUser(userInpt: UserInput): Promise<User> {
  const id = 'tem_' + testId;
  testId++;
  const createdAt = formatDate(Date.now())
  const newUser = { ...userInpt, id, createdAt };
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUsersData.push(newUser);
      mockDashboardData.recentUsers.push(newUser);
      resolve(newUser);
    }, 1000);
  });
}

export function editUser(updateUserInput: UpdateUserInput): Promise<User> {
  const updateFn = (usersArr: User[]) => {
    const index = usersArr.findIndex(user => user.id === updateUserInput.id);
    const updateUser = { ...usersArr[index], ...updateUserInput };
    if (index !== -1) {
      usersArr[index] = updateUser;
      return updateUser;
    }
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const updateUser = updateFn(mockUsersData);
      if (updateUser === undefined) {
        reject("修改用户信息失败");
      } else {
        updateFn(mockDashboardData.recentUsers);
        resolve(updateUser);
      }

    }, 1000);
  });
}

export function deleteUser(id: string): Promise<User[]> {
  const deleteFn = (usersArr: User[]) => {
    const index = usersArr.findIndex(user => user.id === id);
    if (index !== -1) {
      usersArr.splice(index, 1);
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      deleteFn(mockUsersData);
      deleteFn(mockDashboardData.recentUsers);

      resolve(mockUsersData);
    }, 1000);
  });
}