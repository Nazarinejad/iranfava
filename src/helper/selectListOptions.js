import { StatusEnum } from "../enums/statusEnum";

export const selectListOptions = [
  {
    value: StatusEnum.To_Do,
    label: "To Do",
  },
  {
    value: StatusEnum.In_Progress,
    label: "In Progress",
  },
  {
    value: StatusEnum.Done,
    label: "Done",
  },
];
