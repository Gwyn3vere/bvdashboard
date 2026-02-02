export const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD") // tách dấu khỏi chữ
    .replace(/[\u0300-\u036f]/g, "") // xoá dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export const normalizeGroups = (data) => {
  const groups = [];
  const departments = [];
  const specialties = [];

  data.forEach((g) => {
    const { departments: deptList = [], ...group } = g;
    groups.push(group);

    deptList.forEach((d) => {
      const { specialties: specList = [], ...dept } = d;
      departments.push({ ...dept, groupId: g.id });

      specList.forEach((s) => {
        specialties.push({ ...s, departmentId: d.id });
      });
    });
  });

  return { groups, departments, specialties };
};
