export const GetStatusName = (statusCode) => {
    let status = ["To_Do", "In_Progress", "Done"];
    return status[statusCode];
}