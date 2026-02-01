import { useMemo } from "react";
import { useGroupStore } from "../../store/groupStore";
import { useDepartmentStore } from "../../store/departmentStore";
import { useSpecialtyStore } from "../../store/specialtyStore";

export default function useGroupTree() {
  const groups = useGroupStore((s) => s.groups);
  const getDepartmentsByGroupId = useDepartmentStore((s) => s.getDepartmentsByGroupId);
  const getSpecialtiesByDepartmentId = useSpecialtyStore((s) => s.getSpecialtiesByDepartmentId);

  return useMemo(() => {
    return groups.map((group) => ({
      ...group,
      departments: getDepartmentsByGroupId(group.id).map((dept) => ({
        ...dept,
        specialties: getSpecialtiesByDepartmentId(dept.id)
      }))
    }));
  }, [groups, getDepartmentsByGroupId, getSpecialtiesByDepartmentId]);
}
