import { Link } from "@tanstack/react-router";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { DriveSource } from "@/lib/drive/types";

export interface BreadcrumbCrumb {
  id: string;
  name: string;
}

interface FolderBreadcrumbProps {
  crumbs: BreadcrumbCrumb[];
  source: DriveSource;
}

export function FolderBreadcrumb({ crumbs, source }: FolderBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            render={
              <Link
                params={{ folderId: source.rootFolderId }}
                to="/browse/$folderId"
              />
            }
          >
            {source.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {crumbs.map((crumb, index) => (
          <Fragment key={crumb.id}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === crumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  render={
                    <Link
                      params={{ folderId: crumb.id }}
                      to="/browse/$folderId"
                    />
                  }
                >
                  {crumb.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
