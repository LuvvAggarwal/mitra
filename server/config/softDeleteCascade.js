module.exports = {
    user_children: (id) => {
        const now = new Date().toISOString();
        const data = [
            {
                model: "post",
                data: {
                    where: {
                        user_id: id
                    },
                    data: {
                        active: false,
                        updated_on: now,
                        atachments: {
                            updateMany: {
                                where: {
                                    active: true,
                                },
                                data: {
                                    active: false,
                                    deleted: true,
                                    deleted_on: now
                                },
                            }
                        },
                        comments: {
                            updateMany: {
                                where: {
                                    active: true,
                                },
                                data: {
                                    active: false,
                                    deleted: true,
                                    deleted_on: now
                                },
                            }
                        },
                        likes: {
                            updateMany: {
                                where: {
                                    active: true,
                                },
                                data: {
                                    active: false,
                                    deleted: true,
                                    deleted_on: now
                                },
                            }
                        },
                        shares: {
                            updateMany: {
                                where: {
                                    active: true,
                                },
                                data: {
                                    active: false,
                                    deleted: true,
                                    deleted_on: now
                                },
                            }
                        }
                    }
                }
            },
            {
                model: "group_member_map",
                data: {
                    where: {
                        user_id: id
                    },
                    data: {
                        active: false,
                        updated_on: now,
                        group_member_req: {
                            updateMany: {
                                where: {
                                    active: true,
                                },
                                data: {
                                    active: false,
                                    deleted: true,
                                    deleted_on: now
                                },
                            }
                        }
                    }
                }
            },
            {
                model: "group_member_req",
                data: {
                    where: {
                        OR: [
                            { request_sender: id },
                            { request_reciever: id },
                        ]
                    },
                    data: {
                        active: false,
                        deleted: true,
                        deleted_on: now
                    }
                }
            },
            {
                model: "follower_following",
                data: {
                    where: {
                        OR: [
                            { follower: id },
                            { following: id },
                        ]
                    },
                    data: {
                        active: false,
                        deleted: true,
                        deleted_on: now
                    }
                }
            }
        ]
        return data
    },
    group_children: (id) => {
        const now = new Date().toISOString();
        const data = [
            {
                model: "post",
                data: {
                    where: {
                        group_id: id
                    },
                    data: {
                        active: false,
                        updated_on: now,
                        atachments: {
                            updateMany: {
                                where: {
                                    active: true,
                                },
                                data: {
                                    active: false,
                                    deleted: true,
                                    deleted_on: now
                                },
                            }
                        },
                        comments: {
                            updateMany: {
                                where: {
                                    active: true,
                                },
                                data: {
                                    active: false,
                                    deleted: true,
                                    deleted_on: now
                                },
                            }
                        },
                        likes: {
                            updateMany: {
                                where: {
                                    active: true,
                                },
                                data: {
                                    active: false,
                                    deleted: true,
                                    deleted_on: now
                                },
                            }
                        },
                        shares: {
                            updateMany: {
                                where: {
                                    active: true,
                                },
                                data: {
                                    active: false,
                                    deleted: true,
                                    deleted_on: now
                                },
                            }
                        }
                    }
                }
            },
            {
                model: "group_member_map",
                data: {
                    where: {
                        group_id: id
                    },
                    data: {
                        active: false,
                        updated_on: now,
                        group_member_req: {
                            updateMany: {
                                where: {
                                    active: true,
                                },
                                data: {
                                    active: false,
                                    deleted: true,
                                    deleted_on: now
                                },
                            }
                        }
                    }
                }
            },
            {
                model: "group_member_req",
                data: {
                    where: {
                        group_id: id
                    },
                    data: {
                        active: false,
                        deleted: true,
                        deleted_on: now
                    }
                }
            },
        ]
        return data
    },
    post_children: (id) => {
        const now = new Date().toISOString();
        const data = [
            {
                model: "like_post",
                data: {
                    where: {
                        post: id
                    },
                    data: {
                        active: false,
                        deleted: true,
                        deleted_on: now
                    }
                }
            },
            {
                model: "comment_post",
                data: {
                    where: {
                        post: id
                    },
                    data: {
                        active: false,
                        deleted: true,
                        deleted_on: now
                    }
                }
            },
            {
                model: "atachment_post_map",
                data: {
                    where: {
                        post: id
                    },
                    data: {
                        active: false,
                        deleted: true,
                        deleted_on: now
                    }
                }
            },
            {
                model: "share_post",
                data: {
                    where: {
                        post: id
                    },
                    data: {
                        active: false,
                        deleted: true,
                        deleted_on: now
                    }
                }
            }
        ]
        return data
    },
    group_member_map_children: (id) => {
        const now = new Date().toISOString();
        const data = [
            {
                model: "group_member_req",
                data: {
                    where: {
                        member_id: id
                    },
                    data: {
                        active: false,
                        deleted: true,
                        deleted_on: now
                    }
                }
            },
        ]
        return data
    }
}