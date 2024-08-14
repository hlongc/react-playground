import cs from "classnames";
import React, { useRef, useState } from "react";
import { Popconfirm } from "antd";
import styles from "./index.module.less";

export interface FileNameItemProps {
  value: string;
  selected: boolean;
  onClick: () => void;
  /** 文件名称编辑完成时 */
  onEditDone?: (newName: string) => void;
  onRemove?: () => void;
  onAdd?: () => void;
  editable?: boolean;
  deleteable?: boolean;
  creatable?: boolean;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const {
    value,
    selected,
    deleteable,
    editable,
    creatable,
    onClick,
    onEditDone,
    onRemove,
    onAdd,
  } = props;
  const [name, setName] = useState(value);
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const onDoubleClick = () => {
    setEditing(true);

    setTimeout(() => {
      ref.current?.focus();
    }, 40);
  };

  return (
    <>
      <div
        className={cs(styles["tab-item"], selected ? styles.selected : null)}
        onClick={onClick}
      >
        {editing ? (
          <input
            ref={ref}
            className={styles["tabs-item-input"]}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {
              setEditing(false);
              onEditDone?.(name.trim());
            }}
          />
        ) : (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              onDoubleClick={() => {
                if (editable) {
                  onDoubleClick();
                }
              }}
            >
              {name}
            </span>
            {deleteable && (
              <Popconfirm
                title="确认删除该文件吗？"
                cancelText="取消"
                okText="确认"
                onConfirm={(e) => {
                  e?.stopPropagation();
                  onRemove?.();
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  onClick={(e) => e.stopPropagation()}
                >
                  <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                  <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Popconfirm>
            )}
          </div>
        )}
      </div>
      {creatable && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onAdd?.();
          }}
          style={{ cursor: "pointer", fontSize: 20, marginLeft: 10 }}
        >
          +
        </div>
      )}
    </>
  );
};
