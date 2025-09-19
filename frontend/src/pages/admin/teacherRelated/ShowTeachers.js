import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showSpeedDial, setShowSpeedDial] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllTeachers(currentUser._id));
            });
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 100 },
        { id: 'teachSclass', label: 'Class', minWidth: 170 },
    ];

    const rows = teachersList.map((teacher) => {
        return {
            name: teacher.name,
            teachSubject: teacher.teachSubject?.subName || null,
            teachSclass: teacher.teachSclass.sclassName,
            teachSclassID: teacher.teachSclass._id,
            id: teacher._id,
        };
    });

    const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    // Inline Styles
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            padding: '20px'
        },
        floatingElement: {
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: 'float 6s ease-in-out infinite'
        },
        floatingElement1: {
            width: '80px',
            height: '80px',
            top: '10%',
            left: '10%',
            animationDelay: '0s'
        },
        floatingElement2: {
            width: '120px',
            height: '120px',
            top: '20%',
            right: '10%',
            animationDelay: '2s'
        },
        floatingElement3: {
            width: '60px',
            height: '60px',
            bottom: '20%',
            left: '15%',
            animationDelay: '4s'
        },
        floatingElement4: {
            width: '100px',
            height: '100px',
            bottom: '10%',
            right: '20%',
            animationDelay: '1s'
        },
        mainContent: {
            position: 'relative',
            zIndex: 10,
            maxWidth: '1200px',
            margin: '0 auto',
            paddingBottom: '100px'
        },
        card: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        },
        heading: {
            color: 'white',
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '24px',
            textAlign: 'center'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '20px'
        },
        tableHeader: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            fontWeight: '600',
            padding: '16px',
            textAlign: 'left',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '16px'
        },
        tableCell: {
            padding: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '15px'
        },
        button: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            margin: '4px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        },
        deleteButton: {
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
            color: 'white'
        },
        addButton: {
            background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
            color: 'white'
        },
        addSubjectButton: {
            background: 'linear-gradient(135deg, #9775fa 0%, #845ef7 100%)',
            color: 'white'
        },
        loadingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: 'white',
            fontSize: '18px'
        },
        spinner: {
            width: '40px',
            height: '40px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginRight: '16px'
        },
        emptyState: {
            textAlign: 'center',
            color: 'white',
            fontSize: '18px',
            padding: '40px'
        },
        pagination: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
            color: 'white'
        },
        paginationControls: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        paginationButton: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.3s ease'
        },
        paginationButtonDisabled: {
            opacity: 0.5,
            cursor: 'not-allowed'
        },
        select: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '14px',
            outline: 'none'
        },
        speedDial: {
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000
        },
        speedDialButton: {
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        speedDialActions: {
            position: 'absolute',
            bottom: '70px',
            right: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        speedDialAction: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap'
        },
        actionButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px'
        }
    };

    if (loading) {
        return (
            <>
                <style>
                    {`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}
                </style>
                <div style={styles.container}>
                    <div style={styles.loadingContainer}>
                        <div style={styles.spinner}></div>
                        Loading teachers...
                    </div>
                </div>
            </>
        );
    }

    if (response) {
        return (
            <>
                <style>
                    {`
                        @keyframes float {
                            0%, 100% { transform: translateY(0px) rotate(0deg); }
                            33% { transform: translateY(-20px) rotate(120deg); }
                            66% { transform: translateY(-10px) rotate(240deg); }
                        }
                        button:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
                        }
                    `}
                </style>
                <div style={styles.container}>
                    {/* Floating Elements */}
                    <div style={{...styles.floatingElement, ...styles.floatingElement1}}></div>
                    <div style={{...styles.floatingElement, ...styles.floatingElement2}}></div>
                    <div style={{...styles.floatingElement, ...styles.floatingElement3}}></div>
                    <div style={{...styles.floatingElement, ...styles.floatingElement4}}></div>

                    <div style={styles.mainContent}>
                        <div style={styles.card}>
                            <div style={styles.emptyState}>
                                <h2 style={styles.heading}>No Teachers Found</h2>
                                <p style={{ marginBottom: '24px', opacity: 0.8 }}>
                                    Get started by adding your first teacher to the system.
                                </p>
                                <button 
                                    style={{...styles.button, ...styles.addButton}}
                                    onClick={() => navigate("/Admin/teachers/chooseclass")}
                                >
                                    ➕ Add Teacher
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        33% { transform: translateY(-20px) rotate(120deg); }
                        66% { transform: translateY(-10px) rotate(240deg); }
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    button:hover:not(:disabled) {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
                    }
                    .speed-dial-action:hover {
                        background: rgba(255, 255, 255, 0.2);
                        transform: translateX(-4px);
                    }
                    select option {
                        background: #667eea;
                        color: white;
                    }
                `}
            </style>
            <div style={styles.container}>
                {/* Floating Elements */}
                <div style={{...styles.floatingElement, ...styles.floatingElement1}}></div>
                <div style={{...styles.floatingElement, ...styles.floatingElement2}}></div>
                <div style={{...styles.floatingElement, ...styles.floatingElement3}}></div>
                <div style={{...styles.floatingElement, ...styles.floatingElement4}}></div>

                <div style={styles.mainContent}>
                    <div style={styles.card}>
                        <h1 style={styles.heading}>👨‍🏫 Teachers Management</h1>
                        
                        {Array.isArray(teachersList) && teachersList.length > 0 ? (
                            <>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            {columns.map((column) => (
                                                <th key={column.id} style={styles.tableHeader}>
                                                    {column.label}
                                                </th>
                                            ))}
                                            <th style={styles.tableHeader}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedRows.map((row) => (
                                            <tr key={row.id}>
                                                <td style={styles.tableCell}>{row.name}</td>
                                                <td style={styles.tableCell}>
                                                    {row.teachSubject ? (
                                                        row.teachSubject
                                                    ) : (
                                                        <button
                                                            style={{...styles.button, ...styles.addSubjectButton}}
                                                            onClick={() => navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)}
                                                        >
                                                            Add Subject
                                                        </button>
                                                    )}
                                                </td>
                                                <td style={styles.tableCell}>{row.teachSclass}</td>
                                                <td style={styles.tableCell}>
                                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                        <button 
                                                            style={{...styles.button, ...styles.deleteButton}}
                                                            onClick={() => deleteHandler(row.id, "Teacher")}
                                                            title="Delete Teacher"
                                                        >
                                                            🗑️
                                                        </button>
                                                        <button 
                                                            style={styles.button}
                                                            onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}
                                                        >
                                                            View
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination */}
                                <div style={styles.pagination}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span>Rows per page:</span>
                                        <select 
                                            style={styles.select}
                                            value={rowsPerPage}
                                            onChange={(e) => {
                                                setRowsPerPage(parseInt(e.target.value, 10));
                                                setPage(0);
                                            }}
                                        >
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </div>
                                    
                                    <div style={styles.paginationControls}>
                                        <span>
                                            {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, rows.length)} of {rows.length}
                                        </span>
                                        <button
                                            style={{
                                                ...styles.paginationButton,
                                                ...(page === 0 ? styles.paginationButtonDisabled : {})
                                            }}
                                            onClick={() => setPage(page - 1)}
                                            disabled={page === 0}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            style={{
                                                ...styles.paginationButton,
                                                ...(page >= totalPages - 1 ? styles.paginationButtonDisabled : {})
                                            }}
                                            onClick={() => setPage(page + 1)}
                                            disabled={page >= totalPages - 1}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={styles.emptyState}>
                                <p>No teachers available. Add some teachers to get started.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Speed Dial */}
                <div style={styles.speedDial}>
                    {showSpeedDial && (
                        <div style={styles.speedDialActions}>
                            <div 
                                style={styles.speedDialAction}
                                className="speed-dial-action"
                                onClick={() => navigate("/Admin/teachers/chooseclass")}
                            >
                                <button style={styles.actionButton}>
                                    ➕ Add New Teacher
                                </button>
                            </div>
                            <div 
                                style={styles.speedDialAction}
                                className="speed-dial-action"
                                onClick={() => deleteHandler(currentUser._id, "Teachers")}
                            >
                                <button style={styles.actionButton}>
                                    🗑️ Delete All Teachers
                                </button>
                            </div>
                        </div>
                    )}
                    <button 
                        style={styles.speedDialButton}
                        onClick={() => setShowSpeedDial(!showSpeedDial)}
                        title="Actions"
                    >
                        {showSpeedDial ? '✕' : '⚡'}
                    </button>
                </div>

                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </div>
        </>
    );
};

export default ShowTeachers;