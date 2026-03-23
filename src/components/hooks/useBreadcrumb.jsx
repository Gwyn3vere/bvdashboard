import { useState, useEffect } from "react";
import { matchPath, useLocation, useParams } from "react-router-dom";
import metaRoutes from "../../routes/metaRoutes";
import { useDoctorStore } from "../../store/doctorStore";

export default function useBreadcrumb() {
  const location = useLocation();
  const params = useParams();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  const doctors = useDoctorStore((d) => d.doctors);

  useEffect(() => {
    const currentRoute = Object.keys(metaRoutes).find((route) =>
      matchPath({ path: route, end: true }, location.pathname),
    );

    if (!currentRoute) {
      setBreadcrumbItems([]);
      return;
    }

    const rawItems = metaRoutes[currentRoute]?.breadcrumb ?? [];

    const resolve = async () => {
      const resolved = await Promise.all(
        rawItems.map(async (item) => {
          let label = item.label;
          Object.keys(params).forEach((key) => {
            label = label.replace(`:${key}`, params[key]);
          });

          if (item.resolver) {
            try {
              // resolver giờ là sync, nhưng Promise.all vẫn handle được
              label = await item.resolver(params);
            } catch {
              // fallback
            }
          }

          return { ...item, label };
        }),
      );

      setBreadcrumbItems(resolved);
    };

    resolve();
  }, [location.pathname, JSON.stringify(params), doctors]);

  return breadcrumbItems;
}
