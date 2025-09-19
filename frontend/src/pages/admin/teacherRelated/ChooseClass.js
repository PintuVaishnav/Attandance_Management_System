import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID);
        }
        else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID);
        }
    };

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ];

    const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
        return {
            name: sclass.sclassName,
            id: sclass._id,
        };
    });

    const SclassButtonHaver = ({ row }) => {
        return (
            <button 
                style={styles.chooseButton}
                onClick={() => navigateHandler(row.id)}
            >
                Choose
            </button>
        );
    };

    const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
        return (
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
                    {rows.map((row, index) => (
                        <tr key={row.id || index}>
                            {columns.map((column) => (
                                <td key={column.id} style={styles.tableCell}>
                                    {row[column.id]}
                                </td>
                            ))}
                            <td style={styles.tableCell}>
                                <ButtonHaver row={row} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

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
            maxWidth: '800px',
            margin: '0 auto'
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
        chooseButton: {
            background: 'linear-gradient(135deg, #9775fa 0%, #845ef7 100%)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        },
        addButton: {
            background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            display: 'block',
            margin: '0 auto'
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
        }
    };

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

                {loading ? (
                    <div style={styles.loadingContainer}>
                        <div style={styles.spinner}></div>
                        Loading classes...
                    </div>
                ) : (
                    <div style={styles.mainContent}>
                        {getresponse ? (
                            <div style={styles.card}>
                                <div style={styles.emptyState}>
                                    <h2 style={styles.heading}>No Classes Found</h2>
                                    <p style={{ marginBottom: '24px', opacity: 0.8 }}>
                                        Get started by adding your first class to the system.
                                    </p>
                                    <button 
                                        style={styles.addButton}
                                        onClick={() => navigate("/Admin/addclass")}
                                    >
                                        Add Class
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div style={styles.card}>
                                <h1 style={styles.heading}>Choose a Class</h1>
                                {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                                    <TableTemplate 
                                        buttonHaver={SclassButtonHaver} 
                                        columns={sclassColumns} 
                                        rows={sclassRows} 
                                    />
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ChooseClass;