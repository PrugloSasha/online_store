import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
    const { device } = useContext(Context); // Отримуємо контекст пристроїв

    const pageCount = Math.ceil(device.totalCount / device.limit); // Кількість сторінок
    const pages = []; // Масив для нумерації сторінок

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i); // Додаємо номери сторінок до масиву
    }

    // Якщо сторінок менше 2, не показуємо пагінацію
    if (pageCount <= 1) return null;

    return (
        <Pagination className="mt-3">
            {pages.map(page => (
                <Pagination.Item
                    key={page} // Унікальний ключ для кожної сторінки
                    active={device.page === page} // Виділяємо поточну сторінку
                    onClick={() => device.setPage(page)} // Змінюємо сторінку при кліку
                >
                    {page} {/* Відображаємо номер сторінки */}
                </Pagination.Item>
            ))}
        </Pagination>
    );
});

export default Pages;
